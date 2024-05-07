export default function evaluationResult(average) {

    let result = "much less than expected"

    if( average >= 5){
        result = "greatly exceeded"
        return result;
    } else if( average >= 4 && average < 5){
        result = "exceeded expectations"
        return result;
    } else if( average >= 3 && average < 4){
        result = "matched expectations"
        return result;
    }else if( average >= 2 && average < 3){
        result = "less than expected"
        return result;
    }
    return result;
  }