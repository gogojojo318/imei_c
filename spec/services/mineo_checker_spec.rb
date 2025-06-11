class MineoChecker
  def self.check(imei)
    script_path = Rails.root.join('scripts/mineo_checker.js')
    # 明示的に self をつける
    self.run_node_script(script_path, imei)
  end

  def self.run_node_script(path, imei)
    output = `node #{path} #{imei}`.strip
    output.present? ? output : "不明"
  rescue => e
    Rails.logger.error("#{name} エラー: #{e.message}")
    "不明"
  end
end
