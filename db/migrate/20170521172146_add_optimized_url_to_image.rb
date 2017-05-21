class AddOptimizedUrlToImage < ActiveRecord::Migration[5.0]
  def change
    add_column :images, :optimized_url, :string
  end
end
