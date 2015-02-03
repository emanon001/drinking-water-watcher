# Drinking Water Watcher

バランスwiiボードの上に飲料水(ペットボトル)を置き、定期的に重量を取得し、Datadog にデータをためるためのサーバー。  
構成は https://github.com/nanaka-inside/C86/blob/master/tkzwtks/index.rst を参考にしています。

## 環境変数

環境変数                       | 説明
-------------------------------|--------------------------------------------------------------
DRINKING\_WATER\_WATCHER\_PORT | (option) サーバーの待ちうけポート番号。デフォルトは `9000`
DATADOG\_HOST                  | (datadog) データ取得元のホスト名
DATADOG\_API\_KEY              | (datadog) Datadog の API キー

## Datadog に送られるメトリック

プレフィックスは `drinking_water_watcher` です。

メトリック                | 説明
--------------------------|--------------------------------------------------------------------------------------------
number\_of\_water\_bottle | ペットボトルの本数。2Lペットボトルで計算。微妙に補正をかけているので、値がずれる場合もある。
