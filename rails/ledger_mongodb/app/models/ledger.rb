
class Ledger
MongoMapper.database = 'mongo_rails'
  include MongoMapper::Document
  
  key :name, String
  key :name2, String
  key :number, Integer
  key :number2, Integer
  key :counter, Integer
end

