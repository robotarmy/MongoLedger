class CreateLedgers < ActiveRecord::Migration
  def self.up
    create_table :ledgers do |t|
      t.string :name
      t.string :name2
      t.integer :number
      t.integer :number2
      t.integer :counter
      t.timestamps
    end
  end

  def self.down
    drop_table :ledgers
  end
end
