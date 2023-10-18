class Post < ApplicationRecord
  has_one_attached :image
  has_one_attached :audio

  validates :title, presence: true, length: { minimum: 5 }
  validates :description, presence: true, length: { minimum: 10 }
end
