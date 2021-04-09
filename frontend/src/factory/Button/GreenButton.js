import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const GreenButton = withStyles({
    root: {
        backgroundColor: 'rgba(73, 148, 61, 1)',
        '&:hover': {
            backgroundColor: 'rgba(73, 148, 61, 1)'
        }
        
    }
})((props) => <Button color='default' {...props} />)

export default GreenButton