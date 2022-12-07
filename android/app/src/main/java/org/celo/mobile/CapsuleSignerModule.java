package org.celo.mobile;

import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import signer.Signer;

public class CapsuleSignerModule extends ReactContextBaseJavaModule {
  static final String TAG = "CapsuleSignerModule";

  String ids = "[\"USER\",\"RECOVERY\",\"CAPSULE\"]";
  int threshold = 2;
  String serverUrl = "http://mpcnetworkloadbalancer-348316826.us-west-1.elb.amazonaws.com";
  String configBase =
    "{\"ServerUrl\": \"%s\", \"WalletId\": \"%s\", \"Id\":\"%s\", \"Ids\":%s, \"Threshold\":1}";

  CapsuleSignerModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "CapsuleSignerModule";
  }

  /**
   * Perform distributed key generation with the Capsule server
   *
   * @param protocolId
   * @return
   */
  @ReactMethod
  public void createAccount(String walletId, String protocolId, String id, Promise promise) {
    String signerConfig = String.format(configBase, serverUrl, walletId, id, ids);
    (
      new Thread(
        () -> {
          String res = Signer.createAccount(serverUrl, signerConfig, protocolId);
          promise.resolve(res);
        }
      )
    ).start();
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getAddress(String serializedSigner) {
    return Signer.getAddress(serializedSigner);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String sendTransaction(String protocolId, String serializedSigner, String transaction) {
    return Signer.sendTransaction(serverUrl, serializedSigner, "hello world", protocolId);
  }
}
