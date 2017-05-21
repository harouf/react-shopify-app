class AddShopifyProductIdToImages < ActiveRecord::Migration[5.0]
  def change
    add_column :images, :shopify_product_id, :bigint
  end
end
