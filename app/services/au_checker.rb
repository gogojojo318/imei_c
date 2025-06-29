class AuChecker
  def self.check(imei)
    script_path = Rails.root.join('scripts/au_checker.js')
    run_node_script(script_path, imei)
  end

  def self.run_node_script(path, imei)
    output = `node #{path} #{imei}`.strip
    output.present? ? output : "不明"
  rescue => e
    Rails.logger.error("#{name} エラー: #{e.message}")
    "不明"
  end
end
