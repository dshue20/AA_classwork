class ShortenedURL < ApplicationRecord
    validates :short_url, :long_url, presence: true, uniqueness: true

    belongs_to :submitter,
        foreign_key: :user_id,
        class_name: :User,
        optional: true
     
    has_many :visits,
      foreign_key: :short_url_id,
      class_name: :Visit 
    
    has_many :visitors,
      through: :visits,
      source: :visitor  

    def self.random_code
        loop do
            code = SecureRandom.urlsafe_base64(16)
            return code unless ShortenedURL.exists?(short_url: code)
        end
    end

    def self.create_short_url(user, long_url)
        ShortenedURL.create!(
            long_url: long_url,
            short_url: ShortenedURL.random_code,
            user_id: user.id
        )
    end

    def num_clicks
      visits.count
    end

    def num_uniques
      visits.select(:user_id).distinct.count
    end

    def num_recent_uniques
      num.uniques.where(10.minutes.ago)
    end



end