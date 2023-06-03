
function PageName({name, daysLeft}) {

  const realDaysLeft = 14 - daysLeft
  let textColor = "text-yellow"
  let text = "Trial Expired"
  switch (realDaysLeft) {
    case 3:
      textColor = "text-sYellow"
      text = `${realDaysLeft} days left`
      break;
    case 2:
      textColor = "text-sOrange"
      text = `${realDaysLeft} days left`
      break;
    case 1:
      textColor = "text-sRed"
      text = `${realDaysLeft} days left`
      break;
    case 0:
      textColor = "text-sRed"
      text = "Dawn of the final day 24 hours remaining"
      break;
    default:
      textColor = "text-sRed"
      break;
  }
  
  return (
    <div className="boder-1 border-b border-pblines mt-6 flex">
      {name}
      { realDaysLeft < 4 &&
      (
        <div className="absolute top-4 right-4 flex gap-1">Trial: <div className={`flex justify-between  ${textColor}`}> {text} </div></div>
      )}
    </div>
  );
}

export default PageName;