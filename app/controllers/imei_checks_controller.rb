class ImeiChecksController < ApplicationController
  def index
  end

  def create
    imeis = params[:imeis].to_s.spilit(/\r?\n/).map(&:strip).reject(&:blank?)
    @result = ImeiCheckService.check_multiple(imeis)

    @risults = imeis.map { |imei| [imei, "-"]}

    render :index
  end
end
