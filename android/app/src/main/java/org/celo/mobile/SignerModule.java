package org.celo.mobile;

import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
// import sample.Sample;
import signer.Signer;

public class SignerModule extends ReactContextBaseJavaModule {
  static final String TAG = "CapsuleSignerModule";

  String ids = "[\"USER\",\"RECOVERY\",\"CAPSULE\"]";
  int threshold = 2;
  String currentId = "USER";
  String serverUrl = "http://10.0.2.2:3000";
  String messageToSign = "hello";
  String walletId = "4aa90e02-1774-45e7-9e07-86cffb887a21";

  //String protocolId = "8ffa6e4c-38fc-4da2-b48d-ca9f23f84f6b";
  //signer = Signer.NewSigner(networkHost, walletId, currentId, ids, threshold);
  String pStr = String.format(
    "{\"ServerUrl\": \"%s\", \"WalletId\": \"%s\", \"Id\":" +
    "\"USER\", \"Ids\":%s, \"Threshold\":1}",
    serverUrl,
    walletId,
    ids
  );

  SignerModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "SignerModule";
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getProtocolId() {
    String protocolId = Signer.createProtocol(walletId, "PLACEHOLDER", serverUrl);
    Log.i(TAG, "ProtocolId: " + protocolId);
    return protocolId;
  }

  /**
   * Perform distributed key generation with the Capsule server
   *
   * @param protocolId
   * @return
   */
  @ReactMethod(isBlockingSynchronousMethod = true)
  public String createAccount(String protocolId) {
    String serializedSigner = Signer.createAccount(serverUrl, pStr, protocolId);

    String tx = Signer.sendTransaction(serverUrl, serializedSigner, "hello world", protocolId);

    //return new String(config, StandardCharsets.UTF_8);
    return tx;
  }
}
