varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform sampler2D uTexturePositionInit;

uniform vec2 uResolutionInput;
uniform vec2 uResolutionOutput;

uniform sampler2D uTexturePosition;
uniform sampler2D uTextureOutput;

uniform float uStrength;
uniform float uFrictions;
uniform float uSpring;
uniform float uVelocityMax;
uniform float uAttraction;
uniform int uRepulsion;
uniform float uRepulsionStrength;
uniform float uRepulsionSensibility;
uniform int uResetStacked;
uniform float uStackSensibility;
uniform int uInvert;
uniform float uMapStrength;


const float PI = 3.141592653589793;
const float PI_2 = PI * 2.0;

vec4 threshold(sampler2D image, vec2 uv, float threshold, float smoothness) {
  vec4 px = texture2D(image, uv);
  float lum = dot(px, vec4(0.299,0.587,0.114,0.0));
  return vec4(vec3(smoothstep(threshold, threshold + smoothness, lum)), 1.0);
}

vec2 repulsionForce(vec2 position, vec2 d) {
  vec4 color = texture2D(uTextureOutput, position + d / uResolutionOutput.xy);

  if (color.r > 0.2) {
    return d;
  } else {
    return vec2(0.0);
  }
}

vec4 normalMap(sampler2D image, vec2 uv, float strength) {
  const vec3 offsets = vec3(0.0, 1., -1.);
  vec4 left = texture2D(image, uv + offsets.zy / uResolutionOutput);
  vec4 right = texture2D(image, uv + offsets.xy / uResolutionOutput);
  vec4 top = texture2D(image, uv + offsets.xz / uResolutionOutput);
  vec4 bottom = texture2D(image, uv + offsets.xy / uResolutionOutput);
  vec4 color = vec4(1.0) - vec4((left.r - right.r) * 0.5 + 0.5, (top.r - bottom.r) * 0.5 + 0.5, 0., 1.0);

  if (uInvert == 1) {
    color = vec4(1.0) - color;
  }

  return color;
}

void main() {
  vec2 uv = vUv;

  vec4 inputTexture = texture2D(tDiffuse, uv);
  vec4 tex = texture2D(uTexturePosition, uv);

  vec2 position = tex.xy;
  vec2 velocity = tex.zw;

  vec2 positionInit = texture2D(uTexturePositionInit, uv).xy;

  vec2 nm = normalMap(tDiffuse, positionInit, uMapStrength).xy - .5;

  vec2 positionDelta = positionInit - position;

  velocity += nm * uStrength + positionDelta * uAttraction;// + repulsion;
  velocity *= uFrictions;

  vec2 maxVel = vec2(uVelocityMax);
  if(velocity.x > uVelocityMax || velocity.x < -uVelocityMax || velocity.y > uVelocityMax || velocity.y < -uVelocityMax)
  velocity *= 0.7;

  vec2 newPosition = position + velocity;

  if(newPosition.x > 1.0 || newPosition.x < 0.0 || newPosition.y > 1.0 || newPosition.y < 0.0) {
    newPosition = positionInit;
  } else if (uResetStacked == 1) {
    vec4 outputTx = texture2D(uTextureOutput, newPosition);
    float luminance = 0.2126 * outputTx.r + 0.7152 * outputTx.g + 0.0722 * outputTx.b;

    if(luminance > uStackSensibility) newPosition = positionInit;
  }

  gl_FragColor = vec4(newPosition, velocity);
}
