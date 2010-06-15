class LedgersController < ApplicationController
  # GET /ledgers
  # GET /ledgers.xml
  def index
    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'
    head :ok
  end

  # POST /ledgers
  # POST /ledgers.xml
  def create
    params[:ledger] ||=  JSON.parse(params['json'])
    @ledger = Ledger.new(params[:ledger])

    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'

    respond_to do |format|
      if @ledger.save
        format.json  { render :json => @ledger, :status => :created, :location => @ledger, :callback => params[:callback]  }
      else
        format.json  { render :json => @ledger.errors, :status => :unprocessable_entity , :callback => params[:callback] }
      end
    end
  end
end
