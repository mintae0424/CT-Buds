import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const SmallButton = withStyles({
    root: {
        backgroundColor: '#86AC8F',
        '&:hover': {
            backgroundColor: '#86AC8F'
        },
        textTransform: 'none',
        fontSize: '12px',
        padding: '2px 10px',
        fontWeight: 'bold',
    }
})((props) => <Button color='default' {...props} />)

export default SmallButton