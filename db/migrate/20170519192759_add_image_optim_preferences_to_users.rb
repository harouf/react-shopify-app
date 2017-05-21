class AddImageOptimPreferencesToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :image_optim_mode, :string, default: 'auto'
    add_column :users, :image_compress_mode, :string, default: 'lossless'
  end
end
