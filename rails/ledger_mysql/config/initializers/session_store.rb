# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_ledger_mysql_session',
  :secret      => 'de0057c15fdfc91e9228ef13f7d5a806aebacb7ff6dc4d21b57430dbca1bf6365702db7e15e170f70ee557c23388aaf4c01681557f6a5a18e55cd0bee82d10a9'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
