source "https://rubygems.org"

# Pinned Hacker theme (vendored as a gem, not remote)
gem "jekyll-theme-hacker", "~> 0.2.0"

# GitHub Pages gem
gem "github-pages", "~> 231", group: :jekyll_plugins

# If you want to use Jekyll native, uncomment the line below and comment out the github-pages line.
# gem "jekyll", "~> 4.3.0"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Security auditing
gem "bundler-audit", "~> 0.9.2"