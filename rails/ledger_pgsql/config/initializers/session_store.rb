# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_ledger_pgsql_session',
  :secret      => '5d25e053c1afc2259c8dc3996f65c3da9a76b219bd05cf9af1ad2fd72941e9672d86bf8be912ca928862c1e929223556ca2fa7d5167313e84ca76baf8c00a40c'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
