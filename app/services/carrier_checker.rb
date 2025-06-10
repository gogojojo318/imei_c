class CarrierChecker
  def self.check_all(imei)
    results = {}

    results[:docomo]     = DocomoChecker.check(imei)
    results[:au]         = AuChecker.check(imei)
    results[:softbank]   = SoftbankChecker.check(imei)
  
    results
  end
end