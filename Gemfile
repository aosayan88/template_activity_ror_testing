source 'http://rubygems.org'

# git_source(:github) do |repo_name|
#   repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
#   "https://github.com/#{repo_name}.git"
# end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.7'
gem 'sqlite3', git: "https://github.com/larskanis/sqlite3-ruby", branch: "add-gemspec"
# Use mysql as the database for Active Record
#gem 'mysql2', '>= 0.3.18', '< 0.6.0'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
# gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

#gem "paperclip", "~> 4.2"
# gem 'aws-sdk', '~> 3'

# gem 'aws-eventstream', '~> 1.0'
# gem 'aws-partitions', '~> 1.0'
# gem 'aws-sigv4', '~> 1.0'
# gem 'jmespath', '~> 1.0'
# gem 'aws-sdk-core', '~> 3'
# gem 'aws-sdk-kms', '~> 1'
gem 'webrick'
gem 'aws-sdk-s3', '~> 1.0'
#gem 'rmagick', '~> 4.2', '>= 4.2.4'

gem 'wicked_pdf'
#gem 'wkhtmltopdf-binary'
gem 'omniauth-linkedin-oauth2'
gem 'omniauth-google-oauth2'

gem 'pdf-reader'

gem 'stripe'

gem 'ruby-cheerio', '~> 0.0.5'

group :development, :test, :local, :staging do
	# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
	gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
	# Call 'byebug' anywhere in the code to stop execution and get a debugger console
	gem 'byebug', platform: :mri

	# Call 'byebug' anywhere in the code to stop execution and get a debugger console
	# gem 'byebug', platform: :mri
	gem 'rspec-rails'
 	gem 'rails-controller-testing'

   # Selenium Webdriver
   gem 'selenium-webdriver', '~> 3.142', '>= 3.142.7'
   gem 'webdriver', '~> 0.18.0'
end

# group :development do
#   # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
#   gem 'web-console', '>= 3.3.0'
#   gem 'listen', '~> 3.0.5'
#   # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
#   gem 'spring'
#   gem 'spring-watcher-listen', '~> 2.0.0'
# end
gem "sentry-raven", "~> 2.13"
gem "will_paginate", "~> 3.0.4"
gem 'rubyzip' 

# For Mandrilapp sending email
gem 'mandrill-api'

# Generate QR code
gem "rqrcode", "~> 2.0"

# Twilio Gem
gem 'twilio-ruby', '~> 5.61.2'