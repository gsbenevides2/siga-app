import * as React from "react";
import { Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import Svg, { SvgProps, Ellipse, Path, Circle } from "react-native-svg";

/* SVGR has dropped some elements not supported by react-native-svg: title */
export const WelcomeSVG = (props: SvgProps) => {
  const theme = useTheme();
  const color = theme.colors.primary;
  return (
    <Svg data-name="Layer 1" viewBox="0 0 889.076 459.38" {...props}>
      <Ellipse
        cx={444.538}
        cy={398.169}
        fill="#e6e6e6"
        rx={444.538}
        ry={12.435}
      />
      <Path
        fill="#3f3d56"
        d="M681.445 263.431c-.561.008-1.123.016-1.692.016s-1.13-.008-1.691-.016c-29.758-.676-51.326-19.269-45.836-38.777l13.387-47.588 3.383-12.042 59.977 1.023 3.644 11.78 14.348 46.366c6.075 19.615-15.493 38.562-45.52 39.238Z"
      />
      <Path
        d="M712.617 177.827a66.201 66.201 0 0 1-67.004-.761l3.383-12.042 59.977 1.023Z"
        opacity={0.2}
      />
      <Path
        fill="#3f3d56"
        d="M710.086 226.233c2.59-9.656 11.106-23.585 34.986-40.38 41.648-29.294 16.804-51.259 15.727-52.18-2.258-1.93-1.925-4.097.776-4.838a11.224 11.224 0 0 1 9.034 2.103c1.348 1.116 32.46 27.683-14.537 60.734-42.295 29.75-33.303 49.17-33.2 49.356 1.134 2.077-.683 3.739-4.062 3.716s-7.04-1.722-8.177-3.797c-.239-.44-2.96-5.724-.547-14.714ZM652.072 270.367a6.92 6.92 0 0 1-6.92-6.92v-29.988a6.92 6.92 0 0 1 13.84 0v29.988a6.92 6.92 0 0 1-6.92 6.92ZM658.14 199.174a6.92 6.92 0 0 1-9.18 3.394l-27.243-12.534a6.92 6.92 0 0 1 5.785-12.574l27.243 12.535a6.92 6.92 0 0 1 3.395 9.179Z"
      />
      <Path
        fill="#3f3d56"
        d="M701.367 199.174a6.92 6.92 0 0 0 9.18 3.394l27.242-12.534a6.92 6.92 0 0 0-5.785-12.574l-27.243 12.535a6.92 6.92 0 0 0-3.394 9.179ZM707.435 270.367a6.92 6.92 0 0 0 6.92-6.92v-29.988a6.92 6.92 0 1 0-13.84 0v29.988a6.92 6.92 0 0 0 6.92 6.92ZM736.356 76.225a6.806 6.806 0 0 0 1.373-5.409l-3.766-22.157-3.767-22.157a6.913 6.913 0 0 0-11.226-4.164l-17.305 14.34-10.426 8.64A65.694 65.694 0 0 0 670.192 45l-10.043-8.322-17.305-14.34a6.913 6.913 0 0 0-11.227 4.164l-3.766 22.157-3.766 22.157a6.844 6.844 0 0 0 .301 3.474 66.118 66.118 0 1 0 111.97 1.935Z"
      />
      <Path
        fill="#e6e6e6"
        d="M641.11 31.418a3.447 3.447 0 0 0-1.203.218 3.388 3.388 0 0 0-2.184 2.635l-4.567 26.87a3.423 3.423 0 0 0 4.565 3.782l25.553-9.48a3.422 3.422 0 0 0 .993-5.843L643.28 32.21a3.392 3.392 0 0 0-2.172-.792ZM720.704 31.418a3.392 3.392 0 0 0-2.172.791L697.546 49.6a3.422 3.422 0 0 0 .994 5.844l25.553 9.48a3.423 3.423 0 0 0 4.565-3.782l-4.568-26.87a3.388 3.388 0 0 0-2.184-2.635 3.447 3.447 0 0 0-1.202-.218Z"
      />
      <Circle cx={679.753} cy={119.658} r={9.227} fill="#e6e6e6" />
      <Ellipse cx={679.753} cy={115.044} fill="#3f3d56" rx={6.151} ry={2.307} />
      <Path
        fill="#ff6584"
        d="M675.14 125.04h8.458v10.38a4.23 4.23 0 0 1-4.23 4.23 4.23 4.23 0 0 1-4.228-4.23v-10.38Z"
      />
      <Path
        fill="#3f3d56"
        d="M680.267 20.38c-.444.92-.874 1.849-1.28 2.798a65.818 65.818 0 0 0-4.65 35.344 690.36 690.36 0 0 1 2.7-3.888 65.775 65.775 0 0 1 3.23-34.254ZM687.187 28.838c-.443.92-.874 1.85-1.279 2.798a65.818 65.818 0 0 0-4.65 35.344 693.466 693.466 0 0 1 2.7-3.888 65.775 65.775 0 0 1 3.23-34.254Z"
      />
      <Path
        fill={color}
        d="m708.523 194.889-.975-12.398-.975-12.398a3.825 3.825 0 0 0-5.98-2.853l-10.25 7.043-7.484 5.143a5.095 5.095 0 0 0-7.75 0l-7.484-5.143-10.25-7.043a3.825 3.825 0 0 0-5.98 2.853l-.974 12.398-.975 12.398a3.825 3.825 0 0 0 5.46 3.752l11.225-5.355 9.223-4.4a5.101 5.101 0 0 0 7.261 0l9.223 4.4 11.224 5.355a3.825 3.825 0 0 0 5.461-3.752Z"
      />
      <Circle cx={667.451} cy={109.662} r={2.307} fill="#e6e6e6" />
      <Circle cx={692.056} cy={109.662} r={2.307} fill="#e6e6e6" />
      <Path
        fill="#3f3d56"
        d="M233.425 243.052c.562.007 1.123.015 1.692.015s1.13-.008 1.692-.015c29.757-.677 51.325-19.27 45.835-38.777l-13.387-47.589-3.383-12.041-59.976 1.022-3.645 11.78-14.348 46.367c-6.074 19.615 15.494 38.561 45.52 39.238Z"
      />
      <Path
        d="M202.253 157.447a66.201 66.201 0 0 0 67.004-.76l-3.383-12.042-59.976 1.022Z"
        opacity={0.2}
      />
      <Path
        fill="#3f3d56"
        d="M197.5 200.214c-6.474-7.62-20.13-16.565-48.9-21.526-50.178-8.656-37.121-39.14-36.542-40.432 1.215-2.711-.014-4.528-2.772-4.041a11.224 11.224 0 0 0-7.265 5.766c-.742 1.585-17.492 38.91 39.127 48.673 50.957 8.79 51.139 30.19 51.125 30.402-.135 2.363 2.218 3.087 5.263 1.621s5.625-4.57 5.765-6.93c.028-.5.226-6.441-5.801-13.533ZM262.798 249.987a6.92 6.92 0 0 0 6.92-6.92V213.08a6.92 6.92 0 0 0-13.84 0v29.988a6.92 6.92 0 0 0 6.92 6.92ZM256.73 178.794a6.92 6.92 0 0 0 9.18 3.395l27.243-12.534a6.92 6.92 0 1 0-5.785-12.574l-27.243 12.534a6.92 6.92 0 0 0-3.394 9.18ZM213.503 178.794a6.92 6.92 0 0 1-9.179 3.395l-27.243-12.534a6.92 6.92 0 1 1 5.785-12.574l27.243 12.534a6.92 6.92 0 0 1 3.394 9.18Z"
      />
      <Path
        fill="#3f3d56"
        d="M207.436 249.987a6.92 6.92 0 0 1-6.92-6.92V213.08a6.92 6.92 0 0 1 13.84 0v29.988a6.92 6.92 0 0 1-6.92 6.92ZM290.484 53.91a6.844 6.844 0 0 0 .302-3.473l-3.767-22.157-3.766-22.157a6.913 6.913 0 0 0-11.226-4.165l-17.305 14.34-10.043 8.323a65.694 65.694 0 0 0-21.047.317l-10.426-8.64L195.9 1.959a6.913 6.913 0 0 0-11.226 4.165l-3.766 22.157-3.767 22.157a6.806 6.806 0 0 0 1.374 5.408 66.137 66.137 0 1 0 111.97-1.935Z"
      />
      <Path
        fill="#e6e6e6"
        d="m271.59 11.83-20.986 17.39a3.422 3.422 0 0 0 .993 5.844l25.553 9.48a3.423 3.423 0 0 0 4.565-3.783l-4.568-26.87a3.388 3.388 0 0 0-2.184-2.635 3.447 3.447 0 0 0-1.202-.218 3.392 3.392 0 0 0-2.172.792ZM192.964 11.256a3.388 3.388 0 0 0-2.184 2.635l-4.567 26.87a3.423 3.423 0 0 0 4.564 3.782l25.554-9.48a3.422 3.422 0 0 0 .993-5.843l-20.986-17.39a3.392 3.392 0 0 0-2.172-.792 3.447 3.447 0 0 0-1.202.218Z"
      />
      <Circle cx={235.117} cy={99.278} r={9.227} fill="#e6e6e6" />
      <Ellipse cx={235.117} cy={94.665} fill="#3f3d56" rx={6.151} ry={2.307} />
      <Path
        fill="#ff6584"
        d="M235.501 119.27a4.23 4.23 0 0 1-4.229-4.229v-10.38h8.459v10.38a4.23 4.23 0 0 1-4.23 4.23Z"
      />
      <Path
        fill="#3f3d56"
        d="M234.604 0c.443.92.874 1.85 1.279 2.798a65.818 65.818 0 0 1 4.65 35.344 689.837 689.837 0 0 0-2.7-3.888A65.775 65.775 0 0 0 234.603 0ZM227.683 8.458c.444.92.874 1.85 1.28 2.798a65.818 65.818 0 0 1 4.65 35.344 690.725 690.725 0 0 0-2.7-3.888 65.775 65.775 0 0 0-3.23-34.254Z"
      />
      <Path
        fill={color}
        d="m206.347 39.947.975-12.398.975-12.398a3.825 3.825 0 0 1 5.98-2.853l10.25 7.044 7.484 5.143a5.095 5.095 0 0 1 7.75 0l7.484-5.143 10.25-7.044a3.825 3.825 0 0 1 5.98 2.853l.975 12.398.975 12.398a3.825 3.825 0 0 1-5.461 3.753l-11.225-5.355-9.222-4.4a5.101 5.101 0 0 1-7.262 0l-9.222 4.4-11.225 5.355a3.825 3.825 0 0 1-5.46-3.753Z"
      />
      <Path
        fill="#e6e6e6"
        d="M245.113 89.282c0 1.274 1.033 0 2.307 0s2.307 1.274 2.307 0a2.307 2.307 0 0 0-4.614 0ZM225.121 89.282c0 1.274-1.033 0-2.307 0s-2.307 1.274-2.307 0a2.307 2.307 0 0 1 4.614 0Z"
      />
      <Path
        fill="#3f3d56"
        d="M481.05 263.451v-14.663h-73.314V396.333H481.05V381.67h-58.651V263.451h58.651z"
      />
      <Path
        fill={color}
        d="M516.79 248.788v147.545h73.315V248.788Zm58.652 132.882h-43.989V263.45h43.989ZM313.344 381.67V249.705h-14.663V396.333H371.995V381.67h-58.651z"
      />
      <Path
        fill="#3f3d56"
        d="M265.69 263.451v-14.663h-73.314V396.333H265.69V381.67h-58.651v-52.236h58.651v-14.663h-58.651v-51.32h58.651z"
      />
      <Path
        fill={color}
        d="M839.372 263.451v-14.663h-73.314V396.333H839.372V381.67h-58.651v-52.236h58.651v-14.663h-58.651v-51.32h58.651z"
      />
      <Path
        fill="#3f3d56"
        d="M142.889 249.705V370.89l-38.661-38.66-.088.089-.082-.082-39.523 39.523V249.247H49.872v146.628h14.663v-3.379l39.612-39.612 38.742 38.743v4.706h14.663V249.705h-14.663zM717.488 249.705v3.378l-39.612 39.612-38.743-38.742v-4.706H624.47v146.628h14.663V274.689l38.661 38.661.089-.089.081.081 39.524-39.523v122.514h14.662V249.705h-14.662z"
      />
      <Circle cx={335.076} cy={150.38} r={9} fill={color} />
      <Circle cx={113.076} cy={250.38} r={9} fill={color} />
      <Circle cx={291.076} cy={450.38} r={9} fill={color} />
      <Circle cx={517.076} cy={177.38} r={9} fill={color} />
      <Circle cx={782.076} cy={442.38} r={9} fill={color} />
      <Circle cx={791.076} cy={206.38} r={9} fill={color} />
      <Circle cx={677.076} cy={368.38} r={9} fill={color} />
    </Svg>
  );
};
