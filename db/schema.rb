# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170521195634) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "application_charges", force: :cascade do |t|
    t.uuid     "user_id",                              null: false
    t.decimal  "amount_usd",   precision: 8, scale: 2, null: false
    t.datetime "date_created",                         null: false
    t.index ["user_id"], name: "index_application_charges_on_user_id", using: :btree
  end

  create_table "images", force: :cascade do |t|
    t.string   "title"
    t.string   "url"
    t.uuid     "user_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "optimized_url"
    t.bigint   "shopify_product_id"
    t.index ["user_id"], name: "index_images_on_user_id", using: :btree
  end

  create_table "shops", force: :cascade do |t|
    t.string   "shopify_domain", null: false
    t.string   "shopify_token",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true, using: :btree
  end

  create_table "users", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "email",                  default: "",         null: false
    t.string   "encrypted_password",     default: "",         null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,          null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.boolean  "anonymous",              default: false,      null: false
    t.boolean  "confirmed",              default: false,      null: false
    t.string   "access_token"
    t.string   "website",                                     null: false
    t.integer  "provider"
    t.string   "username",                                    null: false
    t.boolean  "unsubscribed",           default: false,      null: false
    t.string   "unsubscribe_token"
    t.integer  "shop_id"
    t.boolean  "admin",                  default: false
    t.string   "image_optim_mode",       default: "auto"
    t.string   "image_compress_mode",    default: "lossless"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "images", "users"
end
