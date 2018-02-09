export default equals;

function equals( parm1, parm2 ){
    if( Object.is ){
        return Object.is( parm1, parm2 );
    }else{
        return parm1 === parm2;
    }
}
