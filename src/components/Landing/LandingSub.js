import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import MenuImage from '../../images/MenuImage.png'
import HealthyImage from '../../images/HealthyImage.png'
import SubConfig from './SubConfig'
import subContentArray from './SubConfig'


const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    section: {
        margin: theme.spacing(4, 2),
        backgroundColor: '#6ca9a6',
        borderRadius: '8px',
        [theme.breakpoints.up('md')]: {
            width: '45%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '30%',
        },
    },
    textWrap: {
        padding: theme.spacing(8, 2, 4, 2),
    },
    mainText: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    subText: {
        marginTop: theme.spacing(2),
        opacity: 0.5,
    },
    subButton: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(1.5, 2.5, 1.5, 2.5),
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#569592'
    },
    imageWrap: {
        paddingBottom: theme.spacing(6),
        textAlign: 'center',
    },
}))

export default function LandingSub() {

    const classes = useStyles()

    let contents = (
        subContentArray.map((info) => {
            return (
                <div className={classes.section}>
                    <div className={classes.textWrap}>
                        <div className={classes.mainText}>
                            {info.main}
                        </div>
                        <div className={classes.subText}>
                            {info.sub}
                        </div>
                        <Button className={classes.subButton} href={info.link}>{info.button}</Button>
                    </div>
                    <div  className={classes.imageWrap}>
                        <img width={info.imageWidth} className={classes.menuImage} src={info.image} />
                    </div>
                </div>
            )
        })
    )

    return (
        <div className={classes.wrapper}>
            {contents}
        </div>
    )
}