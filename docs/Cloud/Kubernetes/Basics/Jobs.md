# Jobs

Jobs are used for non-long-running applications. Once it successfully finishs its work, it will no longer be restarted. To periodically run the job, you can use cron job instead.

- `backOffLimit`: Number of retry before making a job is failed
- `completions`: Number of jobs need to complete in sequence
- `parallelism`: Number of jobs can be executed in parallel
- `restartPolicy`: set to `OnFailure` because we only need to restart when a job is failed; `Never` for not restart

## Job
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: multi-completion-batch-job
spec:
  # How many jobs need to do sequentially in total
  completions: 5
  # How many jobs can do in parallel 
  parallelism: 2
  # Maximal time a job can last
  activeDeadlineSeconds: 60
  template:
    metadata:
      labels:
        app: batch-job
    spec:
      # Cannot use always
      restartPolicy: OnFailure
      containers:
      - name: main
        image: luksa/batch-job
```

## CronJob
```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: batch-job-every-fifteen-minutes
spec:
  # Every 0, 15, 30, 45 minutes every hour
  schedule: "0,15,30,45 * * * *"
  # Must start after the schedule time past
  startingDeadlineSeconds: 15
  jobTemplate:
    spec:
      template:
        metadata:
          labels:
            app: periodic-batch-job
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: luksa/batch-job
```