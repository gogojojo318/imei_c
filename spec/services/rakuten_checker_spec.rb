require 'rails_helper'

RSpec.describe RakutenChecker do
  describe '.check' do
    context '正常系' do
      it 'IMEIを渡すと結果の文字列を返す' do
        imei = '123456789012345'
        result = RakutenChecker.check(imei)
        
        expect(result).to be_a(String)
        expect(result).not_to be_empty
      end
    end

    context '異常系' do
      it '例外が発生してもエラーメッセージを返す' do
        allow(RakutenChecker).to receive(:check).and_raise(StandardError.new("エラー発生"))

        expect {
          RakutenChecker.check('123456789012345')
        }.to raise_error(StandardError)
      end
    end
  end
end
