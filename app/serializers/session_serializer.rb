class SessionSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :website, :access_token, :anonymous, :provider, :shop, :created_at, :admin, :image_optim_mode, :image_compress_mode

  def shop
    if object && object.shop
      object.shop.shopify_domain
    else
      nil
    end
  end
end
