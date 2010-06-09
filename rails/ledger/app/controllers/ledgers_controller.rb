class LedgersController < ApplicationController
  # GET /ledgers
  # GET /ledgers.xml
  def index
    @ledgers = Ledger.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @ledgers }
    end
  end

  # GET /ledgers/1
  # GET /ledgers/1.xml
  def show
    @ledger = Ledger.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @ledger }
    end
  end

  # GET /ledgers/new
  # GET /ledgers/new.xml
  def new
    @ledger = Ledger.new

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
    @ledger = Ledger.new(params[:ledger])

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

    respond_to do |format|
      format.html { redirect_to(ledgers_url) }
      format.xml  { head :ok }
    end
  end
end
