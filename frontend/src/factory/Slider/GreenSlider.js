import { withStyles } from '@material-ui/core/styles'
import { Slider } from '@material-ui/core'

const GreenSlider = withStyles({
    root: {
        color: 'rgba(73, 148, 61, 1)'
    },
    thumb: {
        color: 'rgba(73, 148, 61, 1)',
    },
    track: {
        color: 'rgba(73, 148, 61, 1)',
    },
    rail: {
        color: 'rgba(73, 148, 61, 1)',
    }
})((props) => <Slider color='default' {...props} />)

export default GreenSlider