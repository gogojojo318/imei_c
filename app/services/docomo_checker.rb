require 'mechanize'
require 'nokogiri'

class DocomoChecker
  def self.check(imei)
    agent = Mechanize.new
    agent.user_agent_alias = 'Windows Chrome'  # ブラウザっぽく偽装

    # セッション確立のため最初のページにアクセス
    agent.get('http://nw-restriction.nttdocomo.co.jp/search.php')

    # IMEIをPOST送信（検索実行）
    result_page = agent.post('http://nw-restriction.nttdocomo.co.jp/search.php', { productno: imei })

    # 結果ページのHTMLをNokogiriでパース
    doc = Nokogiri::HTML(result_page.body)

    Rails.logger.debug doc.to_html

    # 判定結果を抽出
    result_text = doc.css('div.result-panel')[1]&.text&.strip

    # 結果がなければフォールバック
    result_text.present? ? result_text : "結果が取得できませんでした"
  rescue => e
    Rails.logger.error "DocomoChecker Error: #{e.message}"
    "チェック中にエラーが発生しました"
  end
end
