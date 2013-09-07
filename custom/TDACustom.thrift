struct TDACustomPayload
{
  1: i32 numberOfArguments,
  2: map<string, string> arguments,
}

struct TDACustomResult
{
  1:  bool success,
  2:  i32  returnValue,
  3:  string returnString,
  4:  bool continueProcessing,
  5:  i32 numberOfArguments,
  6:  map<string, string> transformedArguments,
}

service TDACustom
{
  TDACustomResult PerformCallout(1: TDACustomPayload data);
}