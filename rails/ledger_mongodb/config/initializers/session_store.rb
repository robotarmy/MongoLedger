# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_ledger_session',
  :secret      => '856fa8ebaaaa0ff8c12fa262396dbb94f8b00fe0d403a1f9e6640df20ef0ca011875ddcb24529ef0de670225bdd0d0e9aeda4a6535e3e8e4e768fe9a75dc1957'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
