package io.github.slawomirr.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.github.slawomirr.domain.JobHistory;
import io.github.slawomirr.repository.JobHistoryRepository;
import io.github.slawomirr.web.rest.errors.BadRequestAlertException;
import io.github.slawomirr.web.rest.util.HeaderUtil;
import io.github.slawomirr.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JobHistory.
 */
@RestController
@RequestMapping("/api")
public class JobHistoryResource {

    private final Logger log = LoggerFactory.getLogger(JobHistoryResource.class);

    private static final String ENTITY_NAME = "jobHistory";

    private final JobHistoryRepository jobHistoryRepository;

    public JobHistoryResource(JobHistoryRepository jobHistoryRepository) {
        this.jobHistoryRepository = jobHistoryRepository;
    }

    /**
     * POST  /job-histories : Create a new jobHistory.
     *
     * @param jobHistory the jobHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobHistory, or with status 400 (Bad Request) if the jobHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/job-histories")
    @Timed
    public ResponseEntity<JobHistory> createJobHistory(@RequestBody JobHistory jobHistory) throws URISyntaxException {
        log.debug("REST request to save JobHistory : {}", jobHistory);
        if (jobHistory.getId() != null) {
            throw new BadRequestAlertException("A new jobHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobHistory result = jobHistoryRepository.save(jobHistory);
        return ResponseEntity.created(new URI("/api/job-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-histories : Updates an existing jobHistory.
     *
     * @param jobHistory the jobHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobHistory,
     * or with status 400 (Bad Request) if the jobHistory is not valid,
     * or with status 500 (Internal Server Error) if the jobHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/job-histories")
    @Timed
    public ResponseEntity<JobHistory> updateJobHistory(@RequestBody JobHistory jobHistory) throws URISyntaxException {
        log.debug("REST request to update JobHistory : {}", jobHistory);
        if (jobHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JobHistory result = jobHistoryRepository.save(jobHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-histories : get all the jobHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jobHistories in body
     */
    @GetMapping("/job-histories")
    @Timed
    public ResponseEntity<List<JobHistory>> getAllJobHistories(Pageable pageable) {
        log.debug("REST request to get a page of JobHistories");
        Page<JobHistory> page = jobHistoryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/job-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /job-histories/:id : get the "id" jobHistory.
     *
     * @param id the id of the jobHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobHistory, or with status 404 (Not Found)
     */
    @GetMapping("/job-histories/{id}")
    @Timed
    public ResponseEntity<JobHistory> getJobHistory(@PathVariable Long id) {
        log.debug("REST request to get JobHistory : {}", id);
        Optional<JobHistory> jobHistory = jobHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jobHistory);
    }

    /**
     * DELETE  /job-histories/:id : delete the "id" jobHistory.
     *
     * @param id the id of the jobHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/job-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobHistory(@PathVariable Long id) {
        log.debug("REST request to delete JobHistory : {}", id);

        jobHistoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
