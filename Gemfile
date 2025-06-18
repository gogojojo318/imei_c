source "https://rubygems.org"

ruby "3.1.6"

gem "rails", "~> 7.1.3"
gem "sprockets-rails"
gem "puma", ">= 5.0"
gem "jbuilder"
gem "bootsnap", require: false

# SQLiteは開発・テスト専用に
group :development, :test do
  gem 'sqlite3', '~> 1.4'
  gem "debug", platforms: %i[ mri windows ]
  gem "web-console"
  gem 'dotenv-rails'
end

# テスト専用
group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem 'rspec-rails'
  gem 'rails-controller-testing'
end

# 本番環境では PostgreSQL を使用
group :production do
  gem "pg", "~> 1.4"
end

# その他の共通ライブラリ
gem 'mechanize'
gem "jsbundling-rails"
gem 'sassc-rails'
gem 'bootstrap', '~> 5.3.0'
gem "httparty", "~> 0.23.1"
gem "nokogiri", "~> 1.18"
gem "tzinfo-data", platforms: %i[ windows jruby ]
