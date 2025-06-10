require 'rails_helper'

RSpec.describe SoftBankChecker do
  describe '.check' do
    context '正常系' do
      it 'IMEIを渡すと結果の文字列を返す' do
        imei = '123456789012345'

        # 外部通信したくないならWebMockなどでモック化推奨
        result = SoftBankChecker.check(imei)

        expect(result).to be_a(String)
        expect(result).not_to be_empty
      end
    end

    context '異常系' do
      it '例外が発生してもエラーメッセージが返る' do
        fake_agent = instance_double(Mechanize)
        allow(Mechanize).to receive(:new).and_return(fake_agent)
        allow(fake_agent).to receive(:user_agent_alias=)
        allow(fake_agent).to receive(:get)
        allow(fake_agent).to receive(:post).and_raise(StandardError.new('ネットワークエラー'))

        result = SoftBankChecker.check('123456789012345')

        expect(result).to eq('チェック中にエラーが発生しました')
      end
    end
  end
end
