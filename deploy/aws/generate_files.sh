#! /bin/sh

SRC="../../webapp/build"
TF_FILE="webapp_files.tf"
BUCKET="\${aws_s3_bucket.webapp.id}"
COUNT=0

rm -f $TF_FILE

find $SRC -iname '*.*' | while read path; do

    cat >> $TF_FILE << EOM

resource "aws_s3_bucket_object" "file_$COUNT" {
  bucket = "${BUCKET}"
  key = "${path#$SRC}"
  source = "$path"
  content_type = "\${lookup(var.mime_types, "${path##*.}")}"
  etag = "\${md5(file("$path"))}"
}
EOM

    COUNT=$(expr $COUNT + 1)

done