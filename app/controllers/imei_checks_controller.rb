class ImeiChecksController < ApplicationController
  def index
  end

  def create
    @imei = params[:imei]
    @result = DocomoChecker.check(@imei)
    render :index
  end
end
