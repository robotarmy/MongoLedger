class LedgersController < ApplicationController
  # GET /ledgers
  # GET /ledgers.xml
  def index
    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'
    head :ok
  end

  # GET /ledgers/1
  # GET /ledgers/1.xml
  def show
    @ledger = Ledger.find(params[:id])
    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @ledger }
    end
  end

  # GET /ledgers/new
  # GET /ledgers/new.xml
  def new
    @ledger = Ledger.new
    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @ledger }
    end
  end

  # GET /ledgers/1/edit
  def edit
    @ledger = Ledger.find(params[:id])
  end

  # POST /ledgers
  # POST /ledgers.xml
  def create
    params[:ledger] ||=  JSON.parse(params['json'])
    @ledger = Ledger.new(params[:ledger])

    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'

    respond_to do |format|
      if @ledger.save
        format.html { redirect_to(@ledger, :notice => 'Ledger was successfully created.') }
        format.xml  { render :xml => @ledger, :status => :created, :location => @ledger }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @ledger.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ledgers/1
  # PUT /ledgers/1.xml
  def update
    @ledger = Ledger.find(params[:id])
    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'

    respond_to do |format|
      if @ledger.update_attributes(params[:ledger])
        format.html { redirect_to(@ledger, :notice => 'Ledger was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @ledger.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ledgers/1
  # DELETE /ledgers/1.xml
  def destroy
    @ledger = Ledger.find(params[:id])
    @ledger.destroy
    response['Access-Control-Allow-Origin']= 'http://ledger.robotarmyma.de:3000'

    respond_to do |format|
      format.html { redirect_to(ledgers_url) }
      format.xml  { head :ok }
    end
  end
end
