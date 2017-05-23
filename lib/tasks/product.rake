require 'fileutils'
require 'net/http'
require 'uri'
require 'json'
require 'open-uri'

namespace :product do
  desc 'Fetch Products From Shopify'
  task :fetch_products => :environment do
    User.where.not(:shop_id => nil).each do |user|
      url = URI.parse("https://#{user.shop.shopify_domain}/admin/products.json?fields=id,images,title")
      req = Net::HTTP::Get.new(url.path)
      req.add_field('X-Shopify-Access-Token', user.shop.shopify_token)
      res = Net::HTTP.start(url.host, url.port, :use_ssl => true) do |http|
        http.request(req)
      end
      existing_images = user.images.select('shopify_product_id').reduce({}) do |r, i|
        r[i.id] = false
        r
      end
      image_ids = existing_images.keys
      JSON.parse(res.body)['products'].each do |product|
        if image_ids.include? product['id']
          img = user.images.find_by(:shopify_product_id => product['id'])
          existing_images[img.id] = true
          if product['images'].length == 0
            img.destroy
          elsif product['images'][0]['src'] != img.url
            img.url = product['images'][0]['src']
            img.save
          end
        elsif product['images'].length > 0
          Image.create(title: product['title'], url: product['images'][0]['src'], shopify_product_id: product['id'], user: user)
        end
      end
      existing_images.each do |key, val|
        if !val
          Image.destroy_all(shopify_product_id: key)
        end
      end
    end
  end

  desc 'Optimize Shopify Product Images'
  task :optimize_images => :environment do
    if !File.exists?(Rails.root.join('public', 'products', 'optimized_images'))
      Dir.mkdir Rails.root.join('public', 'products', 'optimized_images')
    end
    image_optim_lossless = ImageOptim.new(:allow_lossy => false)
    image_optim_lossy = ImageOptim.new(:allow_lossy => true)
    Image.joins(:user).where(:optimized_url => nil, :users => { :image_optim_mode => 'auto' }).each do |image|
      download = open(image.url)
      file_path = Rails.root.join('public', 'products', 'optimized_images', image.url.split('/')[-1].split('?')[0])
      IO.copy_stream(download, file_path)
      if image.user.image_compress_mode == 'lossless'
        image_optim_lossless.optimize_image!(file_path)
      else
        image_optim_lossy.optimize_image!(file_path)  
      end
      image.optimized_url = "#{Settings.www_url}/products/optimized_images/#{File.basename(file_path)}"
      image.save
      puts "Image Optimzied For #{image.url}"
    end
  end

end