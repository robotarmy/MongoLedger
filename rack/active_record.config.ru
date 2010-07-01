#\ -w -p 9000
require 'rubygems'
require 'activerecord'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :dbfile =>  'development.sqlite3'
)
class Ledger < ActiveRecord::Base
end


use Rack::Reloader, 0
use Rack::ContentLength

app = proc do |env|
  req = Rack::Request.new(env)
  json = "{}"
  if req.post?
    req.params[:ledger] ||=  JSON.parse(req.params['json'])
    callback = req.params['callback']
    ledger = Ledger.new(req.params[:ledger])
    ledger.save
    json = ";#{callback}(#{ledger.to_json});"
  end
  [ 200, {'Content-Type' => 'application/json',
   'Access-Control-Allow-Origin' => 'http://ledger.robotarmyma.de:3000',
}, json ]
end

run app

