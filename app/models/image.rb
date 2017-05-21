class Image < ApplicationRecord
  include UrlValidator

  belongs_to :user

  validate_url :url
end
