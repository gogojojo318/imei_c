class SoftBankChecker
  def self.check(imei)
    agent = Mechanize.new
    agent.user_agent_alias = 'Windows Chrome' 

    page = agent.get('https://ct99.my.softbank.jp/WBF/icv')
    form = page.forms.first
    form['imei'] = imei
    result_page = form.submit

    doc = Nokogiri::HTML(result_page.body)

    # 判定結果（マークだけ）を抽出（例：fontタグの色つきマークを取得）
    result_mark = doc.at('font[size="8"]')&.text&.strip

    # 半角ハイフン（-）があれば全角マイナス（－）に置換して幅を揃える
    result_mark = result_mark.tr('-', '－') if result_mark

    result_mark.present? ? result_mark : "結果が取得できませんでした"
  rescue => e
    Rails.logger.error "SoftBankChecker Error: #{e.message}"
    "チェック中にエラーが発生しました"
  end
end
