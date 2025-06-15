require 'mechanize'
require 'nokogiri'

class DocomoChecker
  def self.check(imei)
    agent = Mechanize.new
    agent.user_agent_alias = 'Windows Chrome'

    agent.get('http://nw-restriction.nttdocomo.co.jp/search.php')

    result_page = agent.post('http://nw-restriction.nttdocomo.co.jp/search.php', { productno: imei })

    # Shift_JIS → UTF-8 に変換して Nokogiri パース
    sjis_html = result_page.body.force_encoding('Shift_JIS').encode('UTF-8', invalid: :replace, undef: :replace)
    doc = Nokogiri::HTML(sjis_html)

    #Rails.logger.debug doc.to_html

    result_text = doc.css('div.result-panel')[1]&.text&.strip
    result_text = result_text.tr('-', '－') if result_text 

    result_text.present? ? result_text : "結果が取得できませんでした"
  rescue => e
    Rails.logger.error "DocomoChecker Error: #{e.message}"
    "チェック中にエラーが発生しました"
  end
end
