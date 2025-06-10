class ImeiChecksController < ApplicationController
  def index
  end

  def create
    @imei = params[:imei]
    @results = {
      docomo: DocomoChecker.check(@imei),
      #au:     AuChecker.check(@imei),
      softbank: SoftBankChecker.check(@imei),
      rakuten:  nil
      
    }
    
    render :index
  end
end
