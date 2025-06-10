class RakutenChecker
  def self.check(imei)
    result = `node #{Rails.root.join('scripts/rakuten_check.js')} #{imei}`.strip
    return result.present? ? result : "結果が取得できませんでした"
  rescue => e
    Rails.logger.error "RakutenChecker Error: #{e.message}"
    "チェック中にエラーが発生しました"
  end
end
