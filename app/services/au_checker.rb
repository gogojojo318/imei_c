class AuChecker
  def self.check(imei)
    return nil unless imei.present?

    output = `node #{Rails.root}/scripts/au_checker.js #{imei}`

    output.present? ? output.strip : nil
  rescue => e
    Rails.logger.error("AUチェック失敗: #{e.message}")
    nil
  end
end
