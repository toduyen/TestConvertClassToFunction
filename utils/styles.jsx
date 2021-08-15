// Used for calculations
var defaultWidth = 320;
var defaultColors = {
  success: {
    rgb: '94, 164, 0',
    hex: '#5ea400'
  },
  error: {
    rgb: '236, 61, 61',
    hex: '#ec3d3d'
  },
  warning: {
    rgb: '235, 173, 23',
    hex: '#ebad1a'
  },
  info: {
    rgb: '54, 156, 199',
    hex: '#369cc7'
  }
};
var defaultShadowOpacity = '0.9';

var STYLES = {

  Wrapper: {},
  Containers: {
    DefaultStyle: {
      fontFamily: 'inherit',
      position: 'fixed',
      width: defaultWidth,
      padding: '0 10px 10px 10px',
      zIndex: 9998,
      WebkitBoxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box',
      height: 'auto'
    },

    topLeft: {
      top: '0px',
      bottom: 'auto',
      left: '0px',
      right: 'auto'
    },

    topRight: {
      top: '0px',
      bottom: 'auto',
      left: 'auto',
      right: '0px'
    },

    topCenter: {
      top: '0px',
      bottom: 'auto',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2)
    },

    bottomLeft: {
      top: 'auto',
      bottom: '0px',
      left: '0px',
      right: 'auto'
    },

    bottomRight: {
      top: 'auto',
      bottom: '0px',
      left: 'auto',
      right: '0px'
    },

    bottomCenter: {
      top: 'auto',
      bottom: '0px',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2)
    }

  },

  NotificationItem: {
    DefaultStyle: {
      position: 'relative',
      width: '100%',
      cursor: 'pointer',
      borderRadius: '2px',
      fontSize: '13px',
      margin: '10px 0 0',
      padding: '10px 10px 10px 25px',
      display: 'block',
      WebkitBoxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box',
      opacity: 0,
      transition: '0.3s ease-in-out',
      WebkitTransform: 'translate3d(0, 0, 0)',
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform, opacity',
      backgroundPosition:'5px 50%',
      backgroundRepeat:'no-repeat',

      isHidden: {
        opacity: 0
      },

      isVisible: {
        opacity: 1
      }
    },

    success: {
      borderTop: '2px solid ' + defaultColors.success.hex,
      backgroundColor: '#f0f5ea',
      backgroundImage:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmJJREFUeNqkk0toE0Ech3+T3aRJX7RpPNgSgzQljYXiC1FbUcFrL9WTqAe96NGce+hF8KA5eVHsSaQni1CR4kHEFwoVxNrW0iJtA9lqk1TJbnZ2d3bGnbWPDT124Fvm9f32v+wMEUJgL02VD/IkASjEQw5IJwiGvd6AR3JzX8HjAwQmIEQRrjdyBcTV0v+AQBuKqpFcpiuTTiWS8eaG5qisz7D0I8vrK4MLxcWLlmPlvanJugq25NaGltFzfWezKpQYsxl0W99aa0x3dDcm25Mdb+fejVZNf94PCW1u6GwIRXJnegeyds2K6boOSmkdz3oeg5lO7GT6RDZCwjnp7AQwMdyzvztNdRozDAOmadZxt3vE3zZ1eNwLYbFUPJmWTjDgdKIpEa9Wq7Asy0dWsfZ7DTejV9BWbkKhUMC1l7cwOzcLTnlcOsGAAwqUqOu6+Hx+ClpZw8qvFaRIF061H4eqqhhbfooXpVdwQg6oTaPSCQaAuQw3Dl7GzMwMpg6N42iiHw/77/ny69J7PCiOATH4MJX5zk6AI1ZLxjod+XYHiqIgHA7jUe99hNUwFms/cXt5BLyZe/8CPjaxqHSCFXxcW9cqSlzB4I8h/61bXFq8DrRhW5bQaq0inWDAxJ/V8lIIxCRdBMe+X/DlvulBYF+9zLlrWpq5JJ2dAC6KrsHy5U/avGDcJCmCvq+enML2d0u4w0x9ujLPa25eOvUnkYtJpln4+1zLRbJN6UimMa6oalQuuRuM2gu1ij1vLHFH5NGqeKeQ7DrKfggvsS/0zcawx+7LpJAJtCjFoEL2ep3/CTAAj+gy+4Yc2yMAAAAASUVORK5CYII=")',
      color: '#4b583a',
      WebkitBoxShadow: '0 0 1px rgba(' + defaultColors.success.rgb + ',' + defaultShadowOpacity + ')',
      MozBoxShadow: '0 0 1px rgba(' + defaultColors.success.rgb + ',' + defaultShadowOpacity + ')',
      boxShadow: '0 0 1px rgba(' + defaultColors.success.rgb + ',' + defaultShadowOpacity + ')'
    },

    error: {
      borderTop: '2px solid ' + defaultColors.error.hex,
      backgroundColor: '#f4e9e9',
      backgroundImage:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACj0lEQVR4XqVTW08TURCe0253AySilEu1BjHYcNEYoxYLbdpCKBC5NJRY1PCAISak8S8Y/wYvPBkjkcTICzE+mJh4A3xUtksbCWp3aWEp3YW2hKXj2dYWQd/4kpMz+81+38zO2UMQEU4C5jgRJYTjOJgAhrlntFrrKFV5kEjwQMiMQTPOWhVF/ltwpIOfFYzfUFszVdY/ZDFdvgKE5QoJTYN9gYfMm9cyJBX/uVj8Q1FjKAY/qsqdTGvLC9Lbb1GVXcilUpCTNyG3JUNOVUBVdgC93WZjk+2taKv3HzGInT9lZixn5w4am1jG5YW6x09g49MCaDIVJ7dg4+NnMIceAevoAK2+gSUWy1TUZiu0h4jwy1o7GR/owWifDzOCgDoykQgKvT6MUE79slTgaO67fwATY0GM3bgaolTBINZ88V1ieADjgUEU3C7MrKygjmw0gupSURzGcJcH4+P3MfFgDEW34/2hQUujFLvWiqKnHcUeD/LtbZiNrGARmTCPvLMdJVpkfagPpW43il2uZV1bGCLHJcFgANzdBaTDQ1UFbXsbitCL4N4eHawCuXQakL4LLHvm8BQ4VqYm+g6prAYXnj6Dipt2oJXpCkNZcws0UC6VzuhCIBynH7FQcpc8t0KitwMF+3VMf/uKOtI8j8sOO/KONj0ucSseJ0ojQygGhydLn7BTXjVNHUUTYwR1cTFfdW1iHE7XVkOlpQbWHk4AHSLNLYBJ74BhNnP7MFvqQF/rg71+yX87u+p10SouFGkVKTiM66OB/B7p9OCqr1N/zsaDAWdRd+QyiaMjTiOBVzSshv9DBMBQ3czLueN3oYRYIGA2meAOGshdQGiiVBIJyDR+vqNkpi/Nz+/9c5lOgt8n8IvUM0QilAAAAABJRU5ErkJggg==")',
      color: '#412f2f',
      WebkitBoxShadow: '0 0 1px rgba(' + defaultColors.error.rgb + ',' + defaultShadowOpacity + ')',
      MozBoxShadow: '0 0 1px rgba(' + defaultColors.error.rgb + ',' + defaultShadowOpacity + ')',
      boxShadow: '0 0 1px rgba(' + defaultColors.error.rgb + ',' + defaultShadowOpacity + ')'
    },

    warning: {
      borderTop: '2px solid ' + defaultColors.warning.hex,
      backgroundColor: '#f9f6f0',
      backgroundImage:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABqklEQVR4XqWTvWsUURTFf+/tx7DmA5sUmyB+EGQDCkFRxCFosYWCFgELm2ApCBYW/gOCFpYSrUMsBIv4BwTSCSqaWgsTEDRV2EVBZWffvXIYwhZOEdgLhzmcc+7h3WKCuzPOhI+P80rDzE7WwmAHIHnzVIxxl4qJVaKbkYrBxvyVZQRxaYcq0EmehvePzp5YnD67hCAuzd0PUWB2JNQazzo377D7+auAuDR51QWjZWxYvD2e34DsJw+fbwviSJOnTHWBO5aGt6fa84szF67CzguCIYgjTZ4yuP9fYGqO2avO8j348hSKff4OkiAuDXnKKDsqGD1989jSLWJvA/58g+YUv34Xgrg0eSij7MEpsXx66k62O932wjT030NjAuotXj/YE8SlyUMZZbWj3ejmEFubp69fg711yCYha0GWcXftjCAuTZ4yKKsd7dbNfHXuUk6jeAPNCSBCAJpGb78PiGel7gCmLHMXc76/21oNn57kfm5lFg0W0KBPDag7GoYBEuCUE0uy/fIH4cOjy27J0SlI56DEiSVFFi4dEUUIMRBrQZTzjDFj/87/ACmm3+QFX8sKAAAAAElFTkSuQmCC")',
      color: '#5a5343',
      WebkitBoxShadow: '0 0 1px rgba(' + defaultColors.warning.rgb + ',' + defaultShadowOpacity + ')',
      MozBoxShadow: '0 0 1px rgba(' + defaultColors.warning.rgb + ',' + defaultShadowOpacity + ')',
      boxShadow: '0 0 1px rgba(' + defaultColors.warning.rgb + ',' + defaultShadowOpacity + ')'
    },

    info: {
      borderTop: '2px solid ' + defaultColors.info.hex,
      backgroundColor: '#fff',
      backgroundImage:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAwFBMVEX///8AVq0CYcADbNEDaMoDa88Das0EcdkFfe0CZMPv9fu/1esFe+kBXbkEdd8Uf+QEb9VRkdAGf/AFeecRacAEc9wBW7QBX7zs6dwFeudRjswGgvUFd+MCZscDbtTl4tIBWbFEo/rh3s7A2/QAVasCZcYEcNcBYL3n5NUFfOsWhe5UqPVCkNvj4NDd2swyhNMGgPIBXLbq59nB4Pw1m/lToOgCY8RBi9Lv9/8FduHm49QxfMfo5dcQYrNTnuVBhMhJU/nRAAAAAXRSTlMAQObYZgAAAMpJREFUeF4lzdVyRTEIQFGI57i7XXet+///VZN2vy0YBrA9HPZeF34v4L/XWXtVdRdIenT+/NheE2W8puxiJ7O2TZSq7jLiTMfm3u53YVXhIHriu3BIEuXVdYBI2Yr4Dex3npd22893KnpdFl9Qp2n3FgTbEZkm/oSQGuVSjiOagwJ9CPNcrodhPCEpb9MygycZDZTz0xyNsYhhkXMhGJuf0XhJXIBj1K/02YTGDQA4F042G7SRDwfs5EVo828qn3+sbW6cEZI1rsUvrDkTPAFMyQwAAAAASUVORK5CYII=")',
      color: '#41555d',
      WebkitBoxShadow: '0 0 1px rgba(' + defaultColors.info.rgb + ',' + defaultShadowOpacity + ')',
      MozBoxShadow: '0 0 1px rgba(' + defaultColors.info.rgb + ',' + defaultShadowOpacity + ')',
      boxShadow: '0 0 1px rgba(' + defaultColors.info.rgb + ',' + defaultShadowOpacity + ')'
    }
  },

  Title: {
    DefaultStyle: {
      fontSize: '14px',
      margin: '0 0 5px 0',
      padding: 0,
      fontWeight: 'bold'
    },

    success: {
      color: defaultColors.success.hex
    },

    error: {
      color: defaultColors.error.hex
    },

    warning: {
      color: defaultColors.warning.hex
    },

    info: {
      color: defaultColors.info.hex
    }

  },

  MessageWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0
    }
  },

  Dismiss: {
    DefaultStyle: {
      fontFamily: 'Arial',
      fontSize: '17px',
      position: 'absolute',
      top: '4px',
      right: '5px',
      lineHeight: '15px',
      backgroundColor: '#dededf',
      color: '#ffffff',
      borderRadius: '50%',
      width: '14px',
      height: '14px',
      fontWeight: 'bold',
      textAlign: 'center'
    },

    success: {
      color: '#f0f5ea',
      backgroundColor: '#b0ca92'
    },

    error: {
      color: '#f4e9e9',
      backgroundColor: '#e4bebe'
    },

    warning: {
      color: '#f9f6f0',
      backgroundColor: '#e1cfac'
    },

    info: {
      color: '#e8f0f4',
      backgroundColor: '#a4becb'
    }
  },

  Action: {
    DefaultStyle: {
      background: '#ffffff',
      borderRadius: '2px',
      padding: '6px 20px',
      fontWeight: 'bold',
      margin: '10px 0 0 0',
      border: 0
    },

    success: {
      backgroundColor: defaultColors.success.hex,
      color: '#ffffff'
    },

    error: {
      backgroundColor: defaultColors.error.hex,
      color: '#ffffff'
    },

    warning: {
      backgroundColor: defaultColors.warning.hex,
      color: '#ffffff'
    },

    info: {
      backgroundColor: defaultColors.info.hex,
      color: '#ffffff'
    }
  },

  ActionWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0
    }
  }
};

module.exports = STYLES;