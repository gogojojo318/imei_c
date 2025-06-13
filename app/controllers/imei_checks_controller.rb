class ImeiChecksController < ApplicationController
  http_basic_authenticate_with name: ENV['BASIC_AUTH_USER'], password: ENV['BASIC_AUTH_PASSWORD']

  def index
    @imei = nil
    @results = nil
  end


  def create
    @imei = params[:imei].to_s.strip

    # サーバー側のIMEIバリデーション（15桁の数字であること）
    unless @imei.match?(/\A\d{15}\z/)
      flash[:alert] = "IMEIは15桁の数字で入力してください"
      return redirect_to imei_checks_path
    end

    @results = {
      docomo:   DocomoChecker.check(@imei),
      au:       AuChecker.check(@imei),
      softbank: SoftBankChecker.check(@imei),
      rakuten:  RakutenChecker.check(@imei),
      mineo:    MineoChecker.check(@imei)
    }

    render :index
  end
end

