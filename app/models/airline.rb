# == Schema Information
#
# Table name: airlines
#
#  id         :bigint           not null, primary key
#  name       :string
#  image_url  :string
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Airline < ApplicationRecord
  has_many :reviews, dependent: :destroy

  before_create :slugify

  def avg_score
    return 0 unless reviews.count.positive?

    reviews.average(:score).round(2).to_f
  end

  private

  def slugify
    self.slug = name.parameterize
  end
end
