class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string :title
      t.string :url
      t.belongs_to :user, index: true, foreign_key: true, type: :uuid

      t.timestamps nulL: false
    end
  end
end
