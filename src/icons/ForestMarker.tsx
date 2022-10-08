import * as React from 'react'
import { LatLng, Marker } from 'react-native-maps'
import { Circle } from 'react-native-svg'
import colors from 'src/styles/colors'
import Svg, { Path } from 'svgs'

export interface Props {
  color?: string
  size?: number
  coordinate: LatLng
  title?: string
  description?: string
  onPress?: () => void
}

function ForestMarker({ color = colors.greenUI, size = 35, ...props }: Props) {
  const width = (size * 2) / 3
  return (
    <Marker {...props}>
      <Svg width={width} height={size} viewBox="0 0 39 52" fill="none">
        <Path
          d="M0 19.2474C0 27.0078 2.6933 29.1749 17.2031 50.2908C18.1552 51.6715 20.1919 51.6716 21.1441 50.2908C35.654 29.1749 38.3473 27.0078 38.3473 19.2474C38.3473 8.61731 29.763 0 19.1736 0C8.5843 0 0 8.61731 0 19.2474Z"
          fill={color}
        />
        <Circle cx="19.4691" cy="18.8788" r="11.7992" fill="white" />
        <Path
          d="M22.6252 12.4243L19.7728 15.2726V16.6225L23.4942 12.9065C23.2179 12.7256 22.9275 12.5642 22.6252 12.4243Z"
          fill={color}
        />
        <Path
          d="M21.6116 12.0507L19.7728 13.8868V12.5369L20.4755 11.8352C20.8649 11.8751 21.2445 11.9479 21.6116 12.0507Z"
          fill={color}
        />
        <Path
          d="M24.2804 13.5073L19.7728 18.0083V19.1593L24.2804 23.6604C24.519 23.449 24.7426 23.221 24.9494 22.9784L20.5484 18.5838L24.9493 14.1892C24.7425 13.9466 24.519 13.7187 24.2804 13.5073Z"
          fill={color}
        />
        <Path
          d="M25.5361 14.9891L21.9362 18.5838L25.5361 22.1785C25.7125 21.8971 25.8688 21.6019 26.003 21.2948L23.2881 18.5838L26.003 15.8728C25.8688 15.5657 25.7125 15.2705 25.5361 14.9891Z"
          fill={color}
        />
        <Path
          d="M26.3574 16.9047L24.6759 18.5838L26.3574 20.2629C26.4531 19.8877 26.5175 19.5001 26.5476 19.1028L26.0278 18.5838L26.5475 18.0648C26.5175 17.6675 26.4531 17.2799 26.3574 16.9047Z"
          fill={color}
        />
        <Path
          d="M23.4942 24.2611L19.7728 20.5451V21.895L22.6252 24.7433C22.9276 24.6035 23.2179 24.4421 23.4942 24.2611Z"
          fill={color}
        />
        <Path
          d="M21.6116 25.117L19.7728 23.2808L19.7728 24.6307L20.4756 25.3325C20.865 25.2925 21.2446 25.2198 21.6116 25.117Z"
          fill={color}
        />
        <Path
          d="M18.8022 11.868C19.1192 11.8227 19.4433 11.7993 19.7728 11.7993V25.3684C19.4433 25.3684 19.1192 25.3449 18.8022 25.2996L18.8022 11.868Z"
          fill={color}
        />
        <Path
          d="M16.861 12.4522C17.1722 12.3046 17.4965 12.1799 17.8316 12.0803L17.8316 25.0874C17.4965 24.9878 17.1722 24.8631 16.861 24.7155L16.861 12.4522Z"
          fill={color}
        />
        <Path
          d="M14.9197 13.8357C15.2166 13.5332 15.5415 13.2584 15.8904 13.0154L15.8904 24.1523C15.5415 23.9093 15.2166 23.6345 14.9197 23.332L14.9197 13.8357Z"
          fill={color}
        />
        <Path
          d="M12.9785 18.5805C12.9791 17.3027 13.3335 16.1075 13.9491 15.0873L13.9491 22.0804C13.3335 21.0602 12.9791 19.865 12.9785 18.5872C12.9785 18.5861 12.9785 18.585 12.9785 18.5838C12.9785 18.5827 12.9785 18.5816 12.9785 18.5805Z"
          fill={color}
        />
      </Svg>
    </Marker>
  )
}

export default ForestMarker
